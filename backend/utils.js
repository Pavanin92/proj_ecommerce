import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token Inválido' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token Não Encontrado' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Token Administrativo Inválido' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Obrigado por comprar conosco</h1>
  <p>
  Olá ${order.user.name},</p>
  <p>Finalizamos o processo da sua compra.</p>
  <h2>[Pedido ${order._id}] (${order.createdAt
    .toString()
    .substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Produto</strong></td>
  <td><strong>Quantidade</strong></td>
  <td><strong align="right">Valor</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.quantity}</td>
    <td align="right"> R$${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Valor dos itens:</td>
  <td align="right"> R$${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Valor do envio:</td>
  <td align="right"> R$${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Valor total:</strong></td>
  <td align="right"><strong> R$${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Forma de pagamento:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Endereço de entrega</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Obrigado por comprar conosco!
  </p>
  `;
};

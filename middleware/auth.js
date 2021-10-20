import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorizations.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "TEST");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.verify(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

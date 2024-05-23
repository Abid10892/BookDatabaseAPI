import yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  author: yup.string().required().min(4),
  ISBN: yup
    .string()
    .required()
    .matches(/^\d+$/, "ISBN must be a number")
    .length(13),
  publicationDate: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format"),
});

async function validation(req, res, next) {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).send(error.errors[0]);
  }
}

export default validation;

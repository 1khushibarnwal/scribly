export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return res.status(400).json({ message: firstError.message });
  }

  req.body = result.data; // use the parsed/sanitized version (trimmed, lowercased, etc.)
  next();
};

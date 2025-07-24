export const validateRequest = (schema) => {
  {
    return async (req, res, next) => {
      try {
        const validateData = schema.parseAsync(req.body);

        req.body = validateData;
        console.log("Validation passed:", validatedData);
        next();
      } catch (error) {
        if ((error.name = "ZodError")) {
          const errorMessages = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            receivedValue: err.received,
          }));
          console.log("Zod validation failed:", errorMessages);

          return res.status(400).json({
            success: false,
            message: "Input validation failed",
            errors: errorMessages,
          });
        }

        return res.status(500).json({
          success: false,
          message: "validation error occured",
        });
      }
    };
  }
};

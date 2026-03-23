/**
 * Infers a simple JSON-schema-like structure from a JavaScript value.
 *
 * @example
 * import inferSchema from "./inferSchema.js";
 *
 * fetch("/api/user")
 *   .then(r => r.json())
 *   .then(json => {
 *     const schema = inferSchema(json);
 *     console.log(schema); 
 *   });
 *
 * @param {any} obj - Any JavaScript value (object, array, primitive)
 * @returns {object} A minimal schema describing value types and nested shapes
 */
function inferSchema(obj) {
  if (obj === null) return { type: "null" };

  if (Array.isArray(obj)) {
    return {
      type: "array",
      items: obj.length ? inferSchema(obj[0]) : {},
    };
  }

  if (typeof obj === "object") {
    const properties = {};
    for (const key in obj) {
      properties[key] = inferSchema(obj[key]);
    }
    return {
      type: "object",
      properties,
    };
  }

  return { type: typeof obj };
}

export default inferSchema;

export default
{
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Cryogen configuration schema",
  description: "Schema definition for using the cryogen tool to generate code",
  definitions: {
    "array<string>": {
      type: "array",
      uniqueItems: true,
      minItems: 1,
      items: {
        type: "string"
      }
    },
    "lang<exported>": { type: "boolean" },
    include: { $ref: "#/definitions/array<string>" },
    exclude: { $ref: "#/definitions/array<string>" },
    cppClass: {
      type: "object",
      additionalProperties: false,
      properties: {
        exported: { $ref: "#/definitions/lang<exported>" }
      }
    },
    cpp: {
      type: "object",
      additionalProperties: false,
      properties: {
        class: { $ref: "#/definitions/cppClass" }
      }
    }
  },
  type: "object",
  additionalProperties: false,
  properties: {
    include: { $ref: "#/definitions/include" },
    exclude: { $ref: "#/definitions/exclude" },
    cpp: { $ref: "#/definitions/cpp" }
  }
}

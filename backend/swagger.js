import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Management API",
            version: "1.0.0",
            description: "API documentation for Employee Management System",
        },
        servers: [
            {
                url: "https://employee-management-system-wjus.onrender.com",
            },
        ],
    },
    apis: ["./src/router/*.js"], // Router files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
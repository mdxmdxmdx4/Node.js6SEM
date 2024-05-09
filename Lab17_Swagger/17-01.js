const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phone Directory API',
      version: '1.0.0',
    },
  },
  apis: ['./17-01.js'],
};

const swaggerSpec = swaggerJsdoc(options);


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let phoneDirectory = [];


/**
 * @swagger
 * /TS:
 *   get:
 *     summary: Returns the list of all phone records
 *     responses:
 *       200:
 *         description: The list of the phone records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The record ID.
 *                   name:
 *                     type: string
 *                     description: The name of the contact.
 *                   phone:
 *                     type: string
 *                     description: The contact phone number.
 */ 
app.get('/TS', (req, res) => {
  res.json(phoneDirectory);
});

/**
 * @swagger
 * /TS:
 *   post:
 *     summary: Adds a new phone record to the directory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier for the phone record (optional).
 *               name:
 *                 type: string
 *                 description: Name of the contact.
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 description: Phone number of the contact.
 *                 example: +1234567890
 *     responses:
 *       201:
 *         description: Phone record created successfully.
 *       400:
 *         description: Bad request, if the request body is not correct.
 */
app.post('/TS', (req, res) => {
  const phoneRecord = req.body;
  phoneDirectory.push(phoneRecord);
  res.status(201).send();
});

/**
 * @swagger
 * /TS:
 *   put:
 *     summary: Update a phone record
 *     description: Updates the details of an existing phone record. The `id` of the phone record must be provided.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique identifier for the phone record.
 *               name:
 *                 type: string
 *                 description: The updated name of the contact.
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the contact.
 *                 example: +1234567890
 *     responses:
 *       200:
 *         description: Phone record updated successfully.
 *       404:
 *         description: Phone record not found.
 */
app.put('/TS', (req, res) => {
  const { id, ...rest } = req.body;
  const index = phoneDirectory.findIndex(record => record.id === id);
  if (index !== -1) {
    phoneDirectory[index] = { ...phoneDirectory[index], ...rest };
    res.send();
  } else {
    res.status(404).send();
  }
});

/**
 * @swagger
 * /TS:
 *   delete:
 *     summary: Delete a phone record
 *     description: Deletes an existing phone record by its `id`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique identifier for the phone record to delete.
 *                 example: '12345'
 *     responses:
 *       200:
 *         description: Phone record deleted successfully.
 *       404:
 *         description: Phone record not found.
 */
app.delete('/TS', (req, res) => {
  const { id } = req.body;
  phoneDirectory = phoneDirectory.filter(record => record.id !== id);
  res.send();
});

app.listen(port, () => {
  console.log(`Phone directory API is running at http://localhost:${port}`);
});
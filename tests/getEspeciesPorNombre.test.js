const chai = require('chai');
const chaiHttp = require('chai-http');
const performance = require('performance-now');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Validación de entrada en /listarespecies/:nombre', () => {
  it('debería responder con un código de estado 400 si el nombre es un número.', (done) => {
    chai.request(`http://localhost:3000/dev`)
    .get('/listarespecies/1')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe('Prueba de Tiempo de respuesta de /listarespecies/:nombre', () => {
  it('debería responder en menos de 1500 ms', (done) => {
    const start = performance();
    chai.request(`http://localhost:3000/dev`)
      .get('/listarespecies')
      .end((err, res) => {
        const end = performance();
        const tiempoDeRespuesta = end - start;
        expect(tiempoDeRespuesta).to.be.below(1500);
        done();
      });
  });
});

// Execute: npx mocha tests/getEspeciesPornombre.test.js
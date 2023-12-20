const chai = require('chai');
const chaiHttp = require('chai-http');
const performance = require('performance-now');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Prueba de rutas HTTP en /listarespecies', () => {
  it('Debería obtener una lista de especies', (done) => {
    chai.request(`http://localhost:3000/dev`)
      .get('/listarespecies')
      .end((err, res) => {
        expect(res).to.have.status(200);

        expect(res.body).to.have.property('status').to.equal('success');
        expect(res.body).to.have.property('message').to.equal('La solicitud se completó exitosamente');
        expect(res.body).to.have.property('data').to.be.an('array'); 

        done();
      });
  });
});

describe('Prueba de Tiempo de respuesta de /listarespecies', () => {
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

// Execute: npx mocha tests/getEspecies.test.js
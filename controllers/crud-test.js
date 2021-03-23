const crud = require('./crud');
const chai = require('chai');
const assert = chai.assert;


describe('Prueba de decifrado', function () {
    describe('Decifrar',function () {
        it('Debe devolver el texto decifrado', function () {
            const result= 'Hola amigos';
            const fun = crud.decipher('U2FsdGVkX181n7a/WyL+wqddWfAiFuIvwZ3eShL+Mec=');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Contraseña Longitud', function () {
    describe('Se introduce una contraseña menor a 8 caracteres',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaPassLengthInicio('1234567');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Contraseña Longitud', function () {
    describe('Se introduce una contraseña mayor a 15 caracteres',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaPassLengthInicio('1234567891011121314151617');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Contraseña Longitud', function () {
    describe('Se introduce una contraseña entre los 8 y 15 caracteres',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaPassLengthInicio('12345678');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Nombre De Usuario', function () {
    describe('Se introduce un nombre de usuario con caracteres no admitidos',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaUserInicio('holagsjdgeibcu!*]¨¨[]');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Nombre De Usuario', function () {
    describe('Se introduce un nombre de usuario con caracteres admitidos',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaUserInicio('holagsjdgeibcu');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Contraseña', function () {
    describe('Se introduce una contraseña con caracteres no admitidos',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaPassInicio('holagsjdgeibcu!*]¨¨[]');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Contraseña', function () {
    describe('Se introduce una contraseña con caracteres admitidos',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaPassInicio('holagsjdgeibcu');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Nombre De Usuario Longitud', function () {
    describe('Se introduce un nombre de usuario menor a 3 caracteres',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaUserLengthInicio('12');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Nombre De Usuario Longitud', function () {
    describe('Se introduce un nombre de usuario mayor a 40 caracteres',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaUserLengthInicio('12345678910111213141516171819202122232425262728293031323334353637383940');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Nombre De Usuario Longitud', function () {
    describe('Se introduce un nombre de usuario entre los 8 y 15 caracteres',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaUserLengthInicio('12345678');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('No Se introduce ningún Interes',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVacíos();
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('Solo se introduce un Deporte',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVacíos(undefined,undefined,undefined,undefined,"Soccer",undefined);
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('Solo se introduce un Deporte y un Género de Música',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVacíos(undefined,"Dubstep",undefined,undefined,"Soccer",undefined);
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('Solo se introduce un Deporte y un Género de Música y un Videojuego',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVacíos(undefined,"Dubstep",undefined,undefined,"Soccer","RPG");
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('Solo se introduce un Deporte y un Género de Música y un Videojuego y una película',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVacíos(undefined,"Dubstep",undefined,"Acción","Soccer","RPG");
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('Solo se introduce un Deporte y un Género de Música y un Videojuego y una película y una lectura',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVacíos(undefined,"Dubstep","Aventuras","Acción","Soccer","RPG");
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses', function () {
    describe('Introduce todos los campos',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesVacíos("Me gusta de Todo","Dubstep","Aventuras","Acción","Soccer","RPG");
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Gustos Longitud', function () {
    describe('Se introduce un gusto menor a 8 caracteres',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesGustosLength('1234567');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Gustos Longitud', function () {
    describe('Se introduce un gusto mayor a 150 caracteres',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesGustosLength('123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888899091929394959697989910010102103104105');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Gustos Longitud', function () {
    describe('Se introduce un gusto entre los 8 y 150 caracteres',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesGustosLength('Me gusta realizar todo tipo de actividades al aire libre');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Gustos', function () {
    describe('Se introduce un gusto con caracteres no admitidos',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesGustos('holagsjdgeibcu!*]¨¨[]');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Gustos', function () {
    describe('Se introduce un gusto con caracteres admitidos',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesGustos('holagsjdgeibcu');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Musica', function () {
    describe('Se introduce un género no existente',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesMusica('K-POP');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Musica', function () {
    describe('Se introduce un género existente',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesMusica('Dubstep');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Lectura', function () {
    describe('Se introduce un género no existente',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesLectura('k-pop Ilustrado');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Lectura', function () {
    describe('Se introduce un género existente',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesLectura('Narrativo');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Peliculas', function () {
    describe('Se introduce un género no existente',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesPeliculas('La historia del K-Pop con Justin Bieber');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Peliculas', function () {
    describe('Se introduce un género existente',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesPeliculas('Acción');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Deportes', function () {
    describe('Se introduce un género no existente',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesDeportes('K-POP Interactivo');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses Deportes', function () {
    describe('Se introduce un género existente',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesDeportes('Artes Marciales');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses VideoJuegos', function () {
    describe('Se introduce un género no existente',function () {
        it('Debe devolver false', function () {
            const result= false;
            const fun = crud.validaInteresesVideoJuegos('K-POP Dance 2016');
            assert.equal(result, fun);
        });
    });
});
describe('Prueba de Intereses VideoJuegos', function () {
    describe('Se introduce un género existente',function () {
        it('Debe devolver true', function () {
            const result= true;
            const fun = crud.validaInteresesVideoJuegos('RPG');
            assert.equal(result, fun);
        });
    });
});
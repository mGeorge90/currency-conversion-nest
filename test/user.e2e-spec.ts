import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto, LoginUserDto } from '../src/users/dto/create-user.dto';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /users/register', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = {
                email: 'mail@test.com',
                password: 'password',
                name: 'Test User',
            };

            const response = await request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto)
                .expect(HttpStatus.CREATED);

            // Assert the response body or headers if needed
        });
    });

    describe('POST /users/login', () => {
        it('should login a user and return a token', async () => {
            const loginUserDto: LoginUserDto = {
                email: 'mail@test.com',
                password: 'password',
            };

            const response = await request(app.getHttpServer())
                .post('/users/login')
                .send(loginUserDto)
                .expect(HttpStatus.OK);
        });
    });

    describe('GET /users/history', () => {
        it('should get user history', async () => {
            const loginUserDto: LoginUserDto = {
                email: 'mail@test.com',
                password: 'password',
            };
            const loginResponse = await request(app.getHttpServer())
                .post('/users/login')
                .send(loginUserDto)
                .expect(HttpStatus.OK);
            const response = await request(app.getHttpServer())
                .get('/users/history')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .expect(HttpStatus.OK);

        });
    });
});

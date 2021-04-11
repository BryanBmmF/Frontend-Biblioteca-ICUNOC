import { User } from './User';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("user1", "201730159", "user1", "password1", "Administrador", "correo")).toBeTruthy();
  });
});
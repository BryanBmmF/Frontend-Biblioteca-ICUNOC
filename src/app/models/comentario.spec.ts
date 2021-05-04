import { Comentario } from './comentario';

describe('Comentario', () => {
  it('should create an instance', () => {
    expect(new Comentario('','','','',1,'')).toBeTruthy();
  });
});

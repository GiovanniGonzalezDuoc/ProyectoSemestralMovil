import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const apiURL = 'https://my.api.mockaroo.com/noticias.json?key=c917b880';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importar HttpClientTestingModule para realizar pruebas HTTP
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no hay solicitudes pendientes
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from API', () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(apiURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts); // Responder con los datos simulados
  });

  it('should fetch a single post by ID from API', () => {
    const mockPost = { id: 1, title: 'Post 1', content: 'Content 1' };

    service.getPost(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${apiURL}?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a new post', () => {
    const newPost = { title: 'New Post', content: 'New Content' };
    const mockResponse = { id: 3, ...newPost };

    service.createPost(newPost).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiURL}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush(mockResponse);
  });

  it('should update a post', () => {
    const updatedPost = { title: 'Updated Post', content: 'Updated Content' };

    service.updatePost(1, updatedPost).subscribe(response => {
      expect(response).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${apiURL}/posts/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPost);
    req.flush(updatedPost);
  });

  it('should delete a post', () => {
    service.deletePost(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiURL}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Responder con null, ya que es una eliminación exitosa
  });
});

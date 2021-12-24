import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

function createDummyMovie(service: MoviesService) {
  service.create({
    title: 'test',
    year: 2021,
    genres: ['test']
  });
}

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService]
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return movie array', () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create movie', () => {
      const beforeCreateLength = service.getAll().length;
      createDummyMovie(service);
      const afterCreateLength = service.getAll().length;
      expect(afterCreateLength).toEqual(beforeCreateLength + 1);
    });
  });

  describe('getOne', () => {
    it('should throw not found exception', () => {
      // function param needed to catch exceptions in expect()
      expect(() => service.getOne(1)).toThrow(NotFoundException);
    });

    it('should return Movie data', () => {
      createDummyMovie(service);

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
  });

  describe('update', () => {
    it('should update movie', () => {
      createDummyMovie(service);

      const updateMovieId = 1;
      service.update(updateMovieId, { year: 1984 });
      const movie = service.getOne(updateMovieId);
      expect(movie.year).toEqual(1984);
    });
  });
});

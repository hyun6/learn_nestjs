import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    create(movieData: any) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === +id);
        if (!movie) {
            throw new NotFoundException(`not found movie ${id}`);
        }
        return movie;
    }

    deleteOne(id: string): boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    update(id: string, updateData) {
        const movie = this.getOne(id);
        if (movie) {
            this.deleteOne(id);
            this.movies.push({ ...movie, ...updateData });
        }
    }
}

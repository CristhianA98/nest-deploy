import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        /*         {
                    id: uuid(),
                    brand: 'Toyota',
                    model: 'Corolla'
                },
                {
                    id: uuid(),
                    brand: 'Honda',
                    model: 'Cevix'
                }, {
                    id: uuid(),
                    brand: 'Jeep',
                    model: 'Vie'
                } */
    ];

    finAll() {
        return this.cars;
    }

    findById(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id ${id} not found`)

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(car);

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findById(id);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB;
            }

            return car;
        })

        return carDB;
    }

    delete(id: string) {
        let carDB = this.findById(id);

        this.cars = this.cars.filter(car => car.id !== id);
        return;
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }

}

import { IFibonacci } from "../interfaces/fibonacci.interface";

export class FibonacciService {
    public generate(component: IFibonacci): Promise<string> {
        if (!component.n) {
            throw new Error("n is required!");
        }

        let x = 0;
        let curr = this.calculate(x);
        let result = curr.toString();

        while (true) {
            x += 1;
            curr = this.calculate(x);

            if (curr >= component.n) {
                break;
            }
            result = result.concat(` ${curr.toString()}`)
        }

        return Promise.resolve(result);
    }

    private calculate = (n: number): number => {
        if (n < 1) {
            return 0;
        }
        if (n < 2) {
            return 1;
        }

        return this.calculate(n - 2) + this.calculate(n - 1);
    }
}
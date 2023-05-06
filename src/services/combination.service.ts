import { ICombination } from "../interfaces/combination.interface";

export class CombinationService {
    public generate(component: ICombination): Promise<string> {
        if (!(component.n && component.r)) {
            throw new Error("n or r is required!");
        }

        const result = this.calculate(component.n, component.r);
        return Promise.resolve(result.toString());
    }

    private calculate = (n: number, r: number): number => {
        if (n < r) {
            return 0;
        }

        if (r == 0) {
            return 1;
        }

        if (r == 1) {
            return n;
        }

        if (n == 1) {
            return 1
        }

        return this.calculate(n - 1, r - 1) + this.calculate(n - 1, r);
    }
}
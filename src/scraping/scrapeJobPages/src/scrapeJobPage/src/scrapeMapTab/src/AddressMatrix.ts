export class AddrewwMatrix {
    private addressMatrix: string[][];
    constructor(addressString: string) {
        this.addressMatrix = addressString.split("\n").map((line) => line.split(", ").map((str) => str.trim()))
    }
    public getValue(row: number, column: number): string | undefined {
        if (this.addressMatrix[row] && this.addressMatrix[row][column]) {
            return this.addressMatrix[row][column];
        }
        return undefined;
    }
}
export class AddressMatrix {
    private addressMatrix: string[][];
    constructor(addressString: string) {
        this.addressMatrix = addressString
            .split("\n")
            .filter(x=>x.trim())
            .map(
                (line) => line
                    .split(", ")
                    .map(
                        (str) => str.trim()
                    )
                    .filter(x=>x)
            )
    }
    public getValue(row: number, column: number): string | undefined {
        if (this.addressMatrix[row] && this.addressMatrix[row][column]) {
            return this.addressMatrix[row][column];
        }
        return undefined;
    }
}
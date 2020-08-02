class Years {
    constructor() {
        this.years = [];
        this.startYears();
    }

    startYears() {
        for (let index = 2025; index > 1950; index--) {
            let year = {name: String(index), code: String(index)};
            this.years = [...this.years, year];
        }
    }
}

export default new Years();

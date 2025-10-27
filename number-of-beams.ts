function numberOfBeams(bank: string[]): number {
    let totalBeams: number = 0;
    let previousRowDeviceCount: number = 0;
    for (const row of bank) {
        const currentRowDeviceCount: number = row.split('1').length - 1;
        if (currentRowDeviceCount > 0) {
            totalBeams += previousRowDeviceCount * currentRowDeviceCount;
            previousRowDeviceCount = currentRowDeviceCount;
        }
    }
  
    return totalBeams;
}

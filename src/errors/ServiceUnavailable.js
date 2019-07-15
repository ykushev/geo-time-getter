class ServiceUnavailable extends Error {
    constructor(error) {
        if (error.code) {
            this.code = error.code;
        }

        super(error);
    }
}

export default ServiceUnavailable;
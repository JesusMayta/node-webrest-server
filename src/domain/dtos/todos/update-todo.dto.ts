

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly createdAt?: Date,
    ) { };

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.name) returnObj.name = this.name;
        if (this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    };

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, name, createdAt } = props;

        let newCreatedAt = createdAt;

        if (!id || isNaN(Number(id))) {
            return ['Id must be a valid number', undefined];
        };

        if (createdAt) {
            newCreatedAt = new Date(createdAt);
            if (newCreatedAt.toString() === 'Invalid Date') {
                return ['CreatedAt must be a valid date', undefined];
            }
        };

        // return [`id: ${id} name: ${name} date:${createdAt}`, undefined];

        return [undefined, new UpdateTodoDto(id, name, newCreatedAt)];
    };
};
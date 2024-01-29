

export class CreateTodoDto {

    private constructor(
        public readonly name: string,
    ) { };

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {

        const { name } = props;

        if (!name) return ['Name property is required', undefined];

        return [undefined, new CreateTodoDto(name)];
    };

};
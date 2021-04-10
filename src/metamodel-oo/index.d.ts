declare type Class<Type = Function> = Type['constructor']
declare type Object<ValType = any> = { [key: string]: ValType }
declare type JSON<Type = Object> = Type['toJSON']
declare type String<Pattern = '.*'> = string

declare type IRI = string
declare type Language = string
declare type EntryKey = number | string | EntryValue
declare type EntryValue = Literal | Resource
declare type Iteratee<ValType = void> = (value: EntryValue, key: EntryKey) => ValType

export class Literal<ValType = IRI> {
    constructor(param: any);
    value: string;
    language: Language;
    datatype: ValType;
    toJSON(): { '@value': string, '@language'?: Language, '@type'?: IRI };
}

export class Resource {
    constructor(param: { '@id': IRI });
    uid: IRI;
    toJSON(): { '@id': IRI };
}

export class Container<KeyType = EntryKey, ValType = EntryValue> {
    constructor(param?: Array<ValType> | Object<ValType>);
    type: Class<Container>;
    toJSON(): Array<ValType> | Object<ValType>;
    size: number;
    keys(): Iterator<KeyType>;
    values(): Iterator<ValType>;
    entries(): Iterator<[KeyType, ValType]>;
    has(key: KeyType): boolean;
    get(key: KeyType): ValType | undefined;
    add(value: ValType): KeyType | undefined;
    set(key: KeyType, value: ValType): KeyType | undefined;
    delete(key: KeyType): boolean;
    clear(): boolean;
    find(iteratee: Iteratee<boolean>): ValType;
    findKey(iteratee: Iteratee<boolean>): KeyType;
    forEach(iteratee: Iteratee<void>): this;
    filter(iteratee: Iteratee<boolean>): Container;
    map(iteratee: Iteratee<ValType>): Container;
    every(iteratee: Iteratee<boolean>): boolean;
    some(iteratee: Iteratee<boolean>): boolean;
}

export class GraphContainer extends Container<IRI, Resource> {
    #graph: Map<IRI, Resource>;
}

export class IdContainer extends GraphContainer {
    toJSON(): Array<{ '@id': IRI }>;
}

export class TypeContainer extends IdContainer {
    toJSON(): Array<IRI>;
}

export class ListContainer extends Container<number, Literal | Resource> {
    #list: Array<Literal | Resource>;
}

export class SetContainer extends Container<Literal | Resource, Literal | Resource> {
    #set: Map<Literal | Resource>;
}

export class IndexContainer<KeyType = string, ValType = Literal | Resource> extends Container<KeyType, ValType> {

}

export class LanguageContainer extends IndexContainer<Language, Literal<'rdf:langString'>> {

}
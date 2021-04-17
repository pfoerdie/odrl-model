declare type Class<Type = Function> = Type
declare type Object<ValType = any> = { [key: string]: ValType }

declare type IRI = string
declare type Language = string
declare type EntryKey = number | string | EntryValue
declare type EntryValue = Literal | Resource
declare type Iteratee<ValType = void> = (value: EntryValue, key: EntryKey) => ValType

declare type LiteralJSON = {
    '@language': Language;
    '@value': string;
} | {
    '@type': IRI;
    '@value': string;
}

export class Literal<ValType = IRI> {
    constructor(param: number | string | LiteralJSON);
    value: string;
    language: Language;
    datatype: ValType;
    toJSON(): LiteralJSON;
}

declare type ResourceJSON = {
    '@id': IRI;
    '@type'?: TypeContainer;
}

declare type Identifier = {
    '@id': IRI;
}

export class Resource {
    constructor(param: ResourceJSON);
    uid: IRI;
    type: Class<Resource>;
    toJSON(): ResourceJSON;
}

declare type ContainerJSON<KeyType = EntryKey, ValType = EntryValue>
    = Object<ValType> | Array<ValType> | Object<KeyType> | Array<KeyType> | Array<Identifier>

export abstract class Container<KeyType = EntryKey, ValType = EntryValue> {
    constructor(entries?: ContainerJSON);
    type: Class<Container>;
    abstract toJSON(): ContainerJSON<KeyType, ValType>;
    abstract size: number;
    abstract keys(): Iterator<KeyType>;
    abstract values(): Iterator<ValType>;
    abstract entries(): Iterator<[KeyType, ValType]>;
    abstract has(key: KeyType): boolean;
    abstract get(key: KeyType): ValType | undefined;
    abstract add(value: ValType): KeyType | undefined;
    abstract set(key: KeyType, value: ValType): KeyType | undefined;
    abstract delete(key: KeyType): boolean;
    abstract clear(): boolean;
    find(iteratee: Iteratee<boolean>): ValType;
    findKey(iteratee: Iteratee<boolean>): KeyType;
    forEach(iteratee: Iteratee<void>): this;
    filter(iteratee: Iteratee<boolean>): Container;
    map(iteratee: Iteratee<ValType>): Container;
    every(iteratee: Iteratee<boolean>): boolean;
    some(iteratee: Iteratee<boolean>): boolean;
}

export class GraphContainer<KeyType = IRI, ValType = Resource> extends Container<KeyType, ValType> {
    #graph: Map<KeyType, ValType>;
    constructor(graph?: Array<ValType>);
    toJSON(): Array<ValType> | Array<Identifier> | Array<KeyType>;
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
}

export class IdContainer<KeyType = IRI, ValType = Resource> extends GraphContainer<KeyType, ValType> {
    toJSON(): Array<Identifier> | Array<KeyType>;
}

export class TypeContainer<KeyType = IRI, ValType = Resource> extends IdContainer<KeyType, ValType> {
    toJSON(): Array<KeyType>;
}

export class ListContainer<KeyType = number, ValType = Literal | Resource> extends Container<KeyType, ValType> {
    #list: Array<ValType>;
    constructor(list?: Array<ValType>);
    toJSON(): Array<ValType>;
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
}

export class SetContainer<ValType = Literal | Resource> extends Container<ValType, ValType> {
    #set: Set<ValType>;
    constructor(set?: Array<ValType>);
    toJSON(): Array<ValType>;
    size: number;
    keys(): Iterator<ValType>;
    values(): Iterator<ValType>;
    entries(): Iterator<[ValType, ValType]>;
    has(key: ValType): boolean;
    get(key: ValType): ValType | undefined;
    add(value: ValType): ValType | undefined;
    set(key: ValType, value: ValType): ValType | undefined;
    delete(key: ValType): boolean;
    clear(): boolean;
}

export class IndexContainer<KeyType = string, ValType = Literal | Resource> extends Container<KeyType, ValType> {
    #map: Map<KeyType, ValType>;
    constructor(map?: Object<ValType>);
    toJSON(): Object<ValType>;
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
}

export class LanguageContainer<KeyType = Language, ValType = Literal<'rdf:langString'>> extends IndexContainer<KeyType, ValType> {
}
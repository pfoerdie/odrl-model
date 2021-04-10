declare type Object<ValueType> = { [key: string]: ValueType }

declare type IRI = string
declare type Language = string
declare type Datatype = string
declare enum ContainerType { '@language', '@list', '@set', '@graph', '@index', '@id', '@type' }
declare type EntryValue = Literal | Resource
declare type EntryKey = number | string | EntryValue
declare type ResourceJSON = Object<IRI | Resource | Literal | Container>
declare type LiteralJSON = Object<string>
declare type EntriesJSON = Array<EntryValue> | Object<EntryValue>
declare type ContainerJSON = Object<EntriesJSON>
declare type Iteratee<ReturnType = void> = (value: EntryValue, key: EntryKey) => ReturnType

export class Resource {
    // TODO constructor
    uid: IRI;
    toJSON(): { '@id': IRI };
}

export class Literal {
    // TODO constructor
    value: string;
    language: Language;
    datatype: Datatype;
    toJSON(): { '@value': string, '@language'?: Language, '@type'?: Datatype };
}

declare class ContainerAdapter<KeyType = EntryKey, ValueType = EntryValue> {
    constructor(arg: EntriesJSON);
    toJSON(): EntriesJSON;
    size: number;
    keys(): Iterator<KeyType>;
    values(): Iterator<ValueType>;
    entries(): Iterator<[KeyType, ValueType]>;
    has(key: KeyType): boolean;
    get(key: KeyType): ValueType | undefined;
    add(value: ValueType): KeyType | undefined;
    set(key: KeyType, value: ValueType): KeyType | undefined;
    delete(key: KeyType): boolean;
    clear(): void;
}

declare interface ContainerTypes {
    // /** NOTE: #not-implemented */
    // '@language': ContainerAdapter<string, Literal>;
    /** NOTE: #not-implemented */
    '@list': ContainerAdapter<number, Resource | Literal>;
    /** NOTE: #implemented-not-tested */
    '@set': ContainerAdapter<Resource | Literal, Resource | Literal>;
    /** NOTE: #implemented-not-tested */
    '@graph': ContainerAdapter<Resource['uid'], Resource>;
    // /** NOTE: #implemented-not-tested */
    // '@index': ContainerAdapter<string, Resource | Literal>;
    // /** NOTE: #not-implemented */
    // '@id': ContainerAdapter<number | string, Resource>;
    /** NOTE: #not-implemented */
    '@type': ContainerAdapter<string, Resource | Literal>;
}

export class Container {
    constructor(arg: ContainerJSON | ContainerAdapter);
    type: '@language' | '@list' | '@set' | '@graph' | '@index' | '@id' | '@type';
    toJSON(): ContainerJSON;
    size: number;
    keys(): Iterator<EntryKey>;
    values(): Iterator<EntryValue>;
    entries(): Iterator<[EntryKey, EntryValue]>;
    has(key: EntryKey): boolean;
    get(key: EntryKey): EntryValue | undefined;
    add(value: EntryValue): EntryKey | undefined;
    set(key: EntryKey, value: EntryValue): EntryKey | undefined;
    delete(key: EntryKey): boolean;
    clear(): boolean;
    find(iteratee: Iteratee<boolean>): EntryValue;
    findKey(iteratee: Iteratee<boolean>): EntryKey;
    forEach(iteratee: Iteratee<void>): this;
    filter(iteratee: Iteratee<boolean>): Container;
    map(iteratee: Iteratee<EntryValue>): Container;
    every(iteratee: Iteratee<boolean>): boolean;
    some(iteratee: Iteratee<boolean>): boolean;
}
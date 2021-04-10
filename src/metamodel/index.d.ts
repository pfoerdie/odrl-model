type Object<KeyType, ValueType> = { [key: KeyType]: ValueType };

type IRI = string;

export class Resource {
    // TODO constructor
    uid: IRI;
    toJSON(): { '@id': IRI };
};

type Language = string;
type Datatype = string;

export class Literal {
    // TODO constructor
    value: string;
    language: Language;
    datatype: Datatype;
    toJSON(): { '@value': string, '@language'?: Language, '@type'?: Datatype };
};

enum ContainerType { '@language', '@list', '@set', '@graph', '@index', '@id', '@type' };
type EntryValue = Literal | Resource;
type EntryKey = number | string | EntryValue;
type EntriesJSON = Array<EntryValue> | Object<EntryKey, EntryValue>;
type ContainerJSON = Object<ContainerType, EntriesJSON>;
type Iteratee<ReturnType = void> = (value: EntryValue, key: EntryKey) => ReturnType;

type ContainerAdapter<KeyType = EntryKey, ValueType = EntryValue> = {
    constructor(arg: EntriesJSON): this;
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
};

interface ContainerTypes {
    /** NOTE: #not-implemented */
    '@language': ContainerAdapter<string, Literal>;
    /** NOTE: #not-implemented */
    '@list': ContainerAdapter<number, Resource | Literal>;
    /** NOTE: #implemented-not-tested */
    '@set': ContainerAdapter<Resource | Literal, Resource | Literal>;
    /** NOTE: #implemented-not-tested */
    '@graph': ContainerAdapter<Resource.uid, Resource>;
    /** NOTE: #implemented-not-tested */
    '@index': ContainerAdapter<string, Resource | Literal>;
    /** NOTE: #not-implemented */
    '@id': ContainerAdapter<number | string, Resource>;
    /** NOTE: #not-implemented */
    '@type': ContainerAdapter<string, Resouce | Literal>;
};

export class Container {
    constructor(arg: ContainerJSON | ContainerAdapter): this;
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
};
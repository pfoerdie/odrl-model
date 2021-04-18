const pattern = exports;

pattern.nonempty = /\S/;
pattern.IRI = /^[a-z]\w*:\S+$/i;
pattern.Language = /^[a-z]\w*(?:-[a-z]\w*)?$/i;
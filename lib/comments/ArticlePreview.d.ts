import * as React from 'react';
import { Identifier, RaRecord } from 'react-admin';
declare const ArticlePreview: <RecordType extends RaRecord<Identifier> = any>({ id, resource, }: {
    id: Identifier;
    resource: string;
}) => React.JSX.Element;
export default ArticlePreview;

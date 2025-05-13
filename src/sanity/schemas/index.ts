import headerNav from './documents/headerNav';
import page from './documents/page';
import route from './documents/route';
import sanityLink from './objects/sanityLink';
import { sections } from './sections';

const objects = [...sections, sanityLink];
const documents = [page, route, headerNav];
export const schemaTypes = [...objects, ...documents];

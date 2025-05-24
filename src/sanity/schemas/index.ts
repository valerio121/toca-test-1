import footerSettings from './documents/footerSettings';
import headerNav from './documents/headerNav';
import page from './documents/page';
import route from './documents/route';
import { objectTypes as customObjectTypes } from './objects';
import sanityLink from './objects/sanityLink';
import { sections } from './sections';

const objects = [...sections, sanityLink, ...customObjectTypes];
const documents = [page, route, headerNav, footerSettings];
export const schemaTypes = [...objects, ...documents];

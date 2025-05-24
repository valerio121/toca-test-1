import { defineQuery } from 'next-sanity';

export const ROUTES_QUERY = defineQuery(`*[_type == "route"]`);

export const ROUTE_QUERY = defineQuery(`*[_type == "route" && slug.current == $slug][0]{
    ...,
    redirectRoute->{
      slug
    },
    page->{
      ...,
      sections[]{
        _type,
        ...
      }
    }
  }`);

export const HEADER_NAV_QUERY = defineQuery(`*[_type == "headerNav"][0]{
    ...,
    mainNav[]{
      ...,
      internal->{
        slug{
          current
        }
      }
    },
    secondaryNav[]{
      ...,
      internal->{
        slug{
          current
        }
      }
    },
    backgroundImage{
      ...,
      asset->{
        ...
      },
      alt
    }
  }`);

export const FOOTER_SETTINGS_QUERY = defineQuery(`*[_type == "footerSettings"][0]{
  ...,
  navigationColumns[]{
    ...,
    links[]{
      ...,
      internal->{
        slug{
          current
        }
      }
    }
  },
  socialMediaLink{
    ...,
    internal->{
      slug{
        current
      }
    }
  },
  legalLinks[]{
    ...,
    internal->{
      slug{
        current
      }
    }
  }
  // If brandMarkLogo is added:
  // brandMarkLogo{
  //   ...,
  //   asset->{
  //     ...
  //   }
  // }
}`);

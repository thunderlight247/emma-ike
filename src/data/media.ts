/**
 * Central image registry.
 *
 * Every photo on the site comes from here. Swap a URL in one place and it
 * updates everywhere. All Unsplash images are free-to-use public photos and
 * are illustrative only: replace them with real property photos as they
 * become available.
 *
 * The single real photo of the property lives at
 * public/images/emma-ike-property.jpg. If that file is missing or fails to
 * load, SmartImage falls back to `fallback`, then to a neutral colour block,
 * so the page never shows a broken image.
 */

export interface MediaItem {
  src: string;
  alt: string;
  /** Used if `src` fails to load. */
  fallback?: string;
}

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

/* ------------------------------------------------------------------ */
/* REAL PROPERTY PHOTO: replace the file, keep the path.              */
/* ------------------------------------------------------------------ */
export const propertyPhoto: MediaItem = {
  src: "/images/emma-ike-property.jpg",
  alt: "The courtyard at Emma-Ike Guesthouse: yellow rooms with blue-and-white tiled pillars, shade trees and a paved forecourt",
  fallback: unsplash("photo-1739198993891-4aeb790a14e8"),
};

export const media = {
  hero: {
    src: unsplash("photo-1731336250970-dc942b5e0746", 2400),
    alt: "A large made-up bed beside a bright window",
    fallback: unsplash("photo-1731336478850-6bce7235e320", 2400),
  },

  rooms: {
    standard: {
      src: unsplash("photo-1605346434674-a440ca4dc4c0"),
      alt: "Crisp white bed linen beside a dark wooden nightstand",
      fallback: unsplash("photo-1549488497-f4bf0a7f8aee"),
    },
    standardDetail: {
      src: unsplash("photo-1613618902610-95d88084ee11", 1200),
      alt: "Close-up of fresh white pillows on a made bed",
    },
    executive: {
      src: unsplash("photo-1731336478850-6bce7235e320"),
      alt: "A bedroom with a white bed and a warm wooden headboard",
      fallback: unsplash("photo-1685592437742-3b56edb46b15"),
    },
    executiveDetail: {
      src: unsplash("photo-1444201983204-c43cbd584d93", 1200),
      alt: "White comforter and a softly lit table lamp",
    },
    bathroom: {
      src: unsplash("photo-1584622650111-993a426fbf0a", 1200),
      alt: "A clean en-suite bathroom with shower and vanity",
    },
  },

  dining: {
    restaurant: {
      src: unsplash("photo-1782983595342-5c4c2f36d108"),
      alt: "Restaurant tables set beside large windows looking onto greenery",
      fallback: unsplash("photo-1585127580102-15ff5cb422a4"),
    },
    breakfast: {
      src: unsplash("photo-1733259677103-fbb5d70ef830", 1200),
      alt: "Breakfast with coffee, orange juice, scrambled eggs and bread",
      fallback: unsplash("photo-1504754524776-8f4f37790ca0", 1200),
    },
    breakfastTray: {
      src: unsplash("photo-1596701062351-8c2c14d1fdd0", 1200),
      alt: "A breakfast tray with juice and pastries on a bed",
    },
    lounge: {
      src: unsplash("photo-1781955781178-6ea29c66e860"),
      alt: "A softly lit bar with tables, chairs and candles",
      fallback: unsplash("photo-1760386129093-43e986c3cbd8"),
    },
  },

  services: {
    frontDesk: {
      src: unsplash("photo-1775866914943-ba1415a35afc"),
      alt: "A bright reception lobby",
    },
    laundry: {
      src: unsplash("photo-1760722974657-f64bce2f9cc5", 1200),
      alt: "A stack of clean, folded white towels",
      fallback: unsplash("photo-1574421233376-06f2ccf017f7", 1200),
    },
    garden: {
      src: unsplash("photo-1783254877155-fd1c79a120a5", 1200),
      alt: "A wooden doorway framed by green plants",
    },
  },
} satisfies Record<string, Record<string, MediaItem> | MediaItem>;

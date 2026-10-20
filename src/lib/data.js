// Studio content. Edit here, the page updates.
export const studio = {
  name: "CATRED",
  full: "Catred Studio",
  domain: "catred.web.id",
  email: "hello@catred.web.id",
  instagram: "https://www.instagram.com/catred_studio/",
  tagline: "Concept to printed object.",
  location: "Indonesia — working worldwide",
};

export const services = [
  {
    id: "2d",
    index: "01",
    title: "2D Concept Art",
    tag: "characters · environments · illustration",
    desc: "Key art, character sheets and environment concepts with a bold poster sensibility — from thumbnail to final illustration.",
    img: "d2-city.svg",
  },
  {
    id: "3d",
    index: "02",
    title: "3D Art & Animation",
    tag: "models · game assets · characters · animation",
    desc: "Game-ready characters, environments and props, rigged and animated. From blockout to engine import.",
    img: "d3-mecha.svg",
  },
  {
    id: "cad",
    index: "03",
    title: "Mechanical & CAD",
    tag: "engineering · CAD · technical design",
    desc: "Mechanical design and CAD engineering — parts that fit, tolerances that hold, drawings a machinist can build from.",
    img: "dcad-gear.svg",
  },
  {
    id: "print",
    index: "04",
    title: "3D Print & Custom",
    tag: "prototyping · custom figures · finishing",
    desc: "CAD becomes object: printed, finished and painted custom figures, prototypes and art pieces.",
    img: "dprint-fig.svg",
  },
];

export const works = [
  { title: "Dusk Sprawl", type: "2D environment", img: "d2-city.svg" },
  { title: "Redframe Unit", type: "3D character", img: "d3-mecha.svg" },
  { title: "Gearbox Study", type: "CAD engineering", img: "dcad-gear.svg" },
  { title: "Layered Idol", type: "3D print", img: "dprint-fig.svg" },
  { title: "Far Ridge", type: "2D environment", img: "denv-vista.svg" },
  { title: "Night Reel", type: "studio showreel", img: "dhero-reel.svg" },
];

export const pipeline = [
  { step: "Sketch", note: "thumbnails & brief", icon: "search", body: "Thumbnails, brief and references. We sketch fast and rough to explore directions, kill weak ideas early and lock composition, mood and scale before any heavy work starts." },
  { step: "Concept", note: "final 2D art", icon: "nodes", body: "Final 2D art with poster punch. Character sheets, environments and key art rendered clean, with color, light and detail resolved so everyone sees exactly what we are building." },
  { step: "Model", note: "3D build & rig", icon: "cube", body: "Blockout to game-ready build. Clean topology, rigs and engine packs built from the approved concept, checked in 3D from every angle, ready to move, pose and print." },
  { step: "Engineer", note: "CAD & tolerances", icon: "gear", body: "CAD, tolerances and fit. Parts get measured, jointed and test-assembled on screen, with drawings a machinist can build from, so nothing warps, cracks or misses fit later." },
  { step: "Print", note: "physical object", icon: "layers", body: "Prototype to finished object. Test prints and fit checks, then final print, cleanup and paint. A physical piece in hand, not a render stuck on screen." },
];

export const img = (f) => `/dummy/${f}`;

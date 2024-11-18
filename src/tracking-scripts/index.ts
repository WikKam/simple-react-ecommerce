import b1ZoneToSCript from "./integration-tests/b1-prv/b1-zones";
import g1ZoneToScript from "./integration-tests/g1-cmh/g1-zones";
import fra1ZoneToScript from "./integration-tests/fra1/fra1-zones";
import lhr1ZoneToScript from "./integration-tests/lhr1/lhr1-zones";
import iad1ZoneToScript from "./integration-tests/iad1/iad1-zones";
import sin1ZoneToScript from "./integration-tests/sin1/sin1-zones";
import syd1ZoneToScript from "./integration-tests/syd1/syd1-zones";
import defaultZone from "./delfin1b1/default";
import pdx1ZoneToScript from "./integration-tests/pdx1/pdx1-zones";
import yul1ZoneToScript from "./integration-tests/yul1/yul1-zones";
import hnd1ZoneToScript from "./integration-tests/hnd1/hnd1-zones";

const zoneToScript: Record<string, string> = {
    ... b1ZoneToSCript,
    ... g1ZoneToScript,
    ... sin1ZoneToScript,
    ... syd1ZoneToScript,
    ... fra1ZoneToScript,
    ... lhr1ZoneToScript,
    ... iad1ZoneToScript,
    ... pdx1ZoneToScript,
    ... yul1ZoneToScript,
    ... hnd1ZoneToScript
};

export default function getTrackingScriptForZone(zoneId: string) {
    if (zoneId in zoneToScript) {
        console.log(zoneToScript[zoneId])
        return zoneToScript[zoneId];
    }

    return defaultZone;
}
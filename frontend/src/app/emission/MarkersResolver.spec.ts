import {GroupingMarker} from "../../ui/marker/grouping-marker/GroupingMarker";
import {PositionedEmission} from "./position/PositionedEmission";
import {MarkersResolver} from "./MarkersResolver";
import {Marker} from "../../ui/marker/Marker";
import {markerWidthPx} from "../../ui/uiConsts";

describe('StreamMarkersResolver', () => {
  let resolver: MarkersResolver;

  beforeEach(() => {
    resolver = new MarkersResolver();
  });

  it('Single marker is unchanged', () => {
    const position = new PositionedEmission(2.5 * markerWidthPx, 'solo', 'solo', 42);
    const resolvedMarkers = resolver.resolve([position]);
    expect(resolvedMarkers.length).toBe(1);
    expect(resolvedMarkers[0] instanceof Marker).toBeTrue();
    expect(resolvedMarkers[0].position).toBe(position.position);
  });

  it('Two markers are not grouped when they are farther than markerWidthPx', () => {
    const positions = [0, 1.01 * markerWidthPx];
    const resolvedMarkers = resolver.resolve(createPositionedEmissions(positions));
    expect(resolvedMarkers.length).toBe(2);
    expect(resolvedMarkers[0].position).toBe(positions[0]);
    expect(resolvedMarkers[0] instanceof Marker).toBeTrue();
    expect(resolvedMarkers[1].position).toBe(positions[1]);
    expect(resolvedMarkers[1] instanceof Marker).toBeTrue();
  });

  it('Markers not grouped when separated by slightly more than markerWidthPx', () => {
    const position1 = new PositionedEmission(2 * markerWidthPx, 'a', 'a', 1);
    const position2 = new PositionedEmission(3.02 * markerWidthPx, 'b', 'b', 2);
    const position3 = new PositionedEmission(4.05 * markerWidthPx, 'c', 'c', 3);
    const resolvedMarkers = resolver.resolve([position3, position1, position2]);
    expect(resolvedMarkers.length).toBe(3);
    expect(resolvedMarkers[0].position).toBe(position1.position);
    expect(resolvedMarkers[1].position).toBe(position2.position);
    expect(resolvedMarkers[2].position).toBe(position3.position);
  });

  it('Grouping 3 close markers and setting it with avg position', () => {
    const positions = createPositionedEmissions([0, 3, 4]);
    const resolvedMarkers = resolver.resolve(positions);
    expect(resolvedMarkers.length).toBe(1);
    const groupingMarker = resolvedMarkers[0];
    expect(groupingMarker instanceof GroupingMarker).toBeTrue();
    expect((groupingMarker as GroupingMarker).emissions.length).toBe(3);
    expect((groupingMarker as GroupingMarker).emissions).toContain(positions[0]);
    expect((groupingMarker as GroupingMarker).emissions).toContain(positions[1]);
    expect((groupingMarker as GroupingMarker).emissions).toContain(positions[2]);
  });

  it('Grouping 2 close markers and space for another nested in 3 and another is alone setting it with avg position', () => {
    const positions = [0, 0.2 * markerWidthPx, 3 * markerWidthPx, 3.2 * markerWidthPx, 3.7 * markerWidthPx, 6 * markerWidthPx];
    const group1Positions = [positions[0], positions[1]];
    const group2Positions = [positions[2], positions[3], positions[4]];
    const group3AlonePosition = positions[5];
    const positionedEmissions = createPositionedEmissions(positions);

    const resolvedMarkers = resolver.resolve(positionedEmissions);
    expect(resolvedMarkers.length).toBe(3);
    const groupingMarker1 = resolvedMarkers[0];
    expect(groupingMarker1 instanceof GroupingMarker).toBeTrue();
    expect((groupingMarker1 as GroupingMarker).emissions.length).toBe(2);
    expect((groupingMarker1 as GroupingMarker).emissions.map(m => m.position)).toEqual(group1Positions);
    expect(groupingMarker1.position).toBe(group1Positions[0]);
    const groupingMarker2 = resolvedMarkers[1];
    expect(groupingMarker2 instanceof GroupingMarker).toBeTrue();
    expect((groupingMarker2 as GroupingMarker).emissions.length).toBe(3);
    expect((groupingMarker2 as GroupingMarker).emissions.map(m => m.position)).toEqual(group2Positions);
    expect(groupingMarker2.position).toBe(group2Positions[0]);
    const aloneMarker = resolvedMarkers[2];
    expect(aloneMarker instanceof Marker).toBeTrue();
    expect(aloneMarker instanceof GroupingMarker).toBeFalse();
    expect(aloneMarker.position).toBe(group3AlonePosition);
  });

  it('Grouping 0,1,7,15,18,22 positions', () => {
    const group1Positions = [0, 1, 7, 15];
    const group2Positions = [18, 22];
    const positions = [...group1Positions, ...group2Positions];
    const positionedEmissions = createPositionedEmissions(positions);
    const resolvedMarkers = resolver.resolve(positionedEmissions);
    expect(resolvedMarkers.length).toBe(2);
    const groupingMarker1 = resolvedMarkers[0];
    expect(groupingMarker1 instanceof GroupingMarker).toBeTrue();
    expect((groupingMarker1 as GroupingMarker).emissions.length).toBe(4);
    expect((groupingMarker1 as GroupingMarker).emissions.map(m => m.position)).toEqual(group1Positions);
    expect(groupingMarker1.position).toBe(group1Positions[0]);
    const groupingMarker2 = resolvedMarkers[1];
    expect(groupingMarker2 instanceof GroupingMarker).toBeTrue();
    expect((groupingMarker2 as GroupingMarker).emissions.length).toBe(2);
    expect((groupingMarker2 as GroupingMarker).emissions.map(m => m.position)).toEqual(group2Positions);
    expect(groupingMarker2.position).toBe(group2Positions[0]);
  });
  //
  it('Grouping many close markers that are close to the end', () => {
    const group1 = [581.4];
    const group2 = [604.656, 610.128, 614.232, 618.336];
    const group3 = [621.072, 625.176, 629.28, 632.016, 634.752];
    const group4 = [638.856, 642.96, 645.696, 648.432, 651.168];
    const values = [...group1, ...group2, ...group3, ...group4];
    const positionedEmissions = values.map((position, index) => {
      const id = (index + 1).toString();
      return new PositionedEmission(position, id, id, position);
    });
    const resolvedMarkers: Array<Marker | GroupingMarker> = resolver.resolve(positionedEmissions);
    expect(resolvedMarkers.length).toEqual(4);
    expect((resolvedMarkers[0] as Marker).position).toEqual(group1[0]);

    expect((resolvedMarkers[1] as GroupingMarker).position).toBe((group2[0]));
    expect((resolvedMarkers[1] as GroupingMarker).emissions.map(m => m.position)).toEqual(group2);

    expect((resolvedMarkers[2] as GroupingMarker).position).toBe((group3[0]));
    expect((resolvedMarkers[2] as GroupingMarker).emissions.map(m => m.position)).toEqual(group3);

    expect((resolvedMarkers[3] as GroupingMarker).position).toBe((group4[0]));
    expect((resolvedMarkers[3] as GroupingMarker).emissions.map(m => m.position)).toEqual(group4);
  });
});

function createPositionedEmissions(positions: number[]): PositionedEmission[] {
  return positions.map((position, index) => {
    const value = 'not important - ' + index;
    const displayValue = 'not important either - ' + index;
    return new PositionedEmission(position, value, displayValue, position);
  });
}

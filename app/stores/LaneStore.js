import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }
  create(lane) {
    const lanes = this.lanes;

    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    this.setState({
      lanes: [...lanes, lane]
    });
  }
  update(updatedLane) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === updatedLane.id) {
        return Object.assign({}, lane, updatedLane);
      }
      return lane;
    });
    this.setState({lanes})
  }
  deleteNotes(id) {
    this.lanes.map(lane =>{
      if (lane.id === id) {
        lane.notes.map(note =>{
          NoteActions.delete(note.id);
        });
      }
    });
  }
  delete(id) {
    this.deleteNotes(id);
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id)
    });
  }
  attachToLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id == laneId) {
        if (lane.notes.indexOf(noteId) === -1) {
          lane.notes.push(noteId);
        }
        else {
          console.warn('Already attached note to lane', lanes);
        }
      }
      return lane;
    });
    this.setState({lanes});
  }
  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        lane.notes = lane.notes.filter(note => note.id !== noteId)
      }
      return lane;
    });
    this.setState({lanes});
  }
}

export default alt.createStore(LaneStore, 'LaneStore');

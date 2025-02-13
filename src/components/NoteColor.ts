export function getNoteColor(note: number){
  return note >= 0 && note <= 50 ? 'red' : note > 50 && note <= 70 ? 'green' : 'deepskyblue'
}
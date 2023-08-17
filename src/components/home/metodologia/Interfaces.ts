export interface MetodologiasProps{
    closeModal:Function;
    text:string,
    title:string
  }
  export enum Neuroeducacion{
    title='Neuroeducación',
  text='La Neuroeducación se enfoca en crear un ambiente seguro y estimulante para el aprendizaje, en donde las niñas y los niños son los protagonistas y van aprendiendo a través de la experiencia, de forma multisensorial, involucrando las emociones y fomentando la creatividad.'
}
export enum Music_art{
  title='Música y arte',
  text='El arte fomenta la creatividad, mejora las habilidades motoras y la coordinación, desarrolla el lenguaje y la comunicación, promueve la empatía y la comprensión, y mejora la autoestima y la confianza. Por lo tanto, utilizamos el arte para que los niños sientan motivados a seguir aprendiendo.'
}
export enum VideoModelling{
  title='Video modeling',
  text='El modelado de video puede ser una técnica efectiva de intervención para niñas y niños con diagnósticos como el autismo y dificultades en el desarrollo de lenguaje. Puede aumentar la motivación y la atención, mejorar la comprensión y el aprendizaje, facilitar la imitación y la práctica, favorecer la generalización de habilidades y puede ser utilizado en terapias individuales y grupales. Por lo tanto, utilizamos el modelado de video como una herramienta efectiva para recuperar habilidades lingüísticas y motoras en niñas y niños con diagnósticos específicos.'
}

export interface ModalContent{
  text:''|Neuroeducacion.text|Music_art.text|VideoModelling.text
  title:''|Neuroeducacion.title|Music_art.title|VideoModelling.title
}
export const Types= {
  Neuroeducacion:<ModalContent> { title: Neuroeducacion.title, text: Neuroeducacion.text },
  Music_art:<ModalContent>  { title: Music_art.title, text: Music_art.text },
  VideoModelling:<ModalContent>  { title: VideoModelling.title, text: VideoModelling.text }
};
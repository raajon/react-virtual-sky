import ar from '../i18n/ar.json';
import cs from '../i18n/cs.json';
import de from '../i18n/de.json';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import fr from '../i18n/fr.json';
import gl from '../i18n/gl.json';
import it from '../i18n/it.json';
import nl from '../i18n/nl.json';
import pl from '../i18n/pl.json';
import pt from '../i18n/pt.json';

export const i18n = (lang) =>{
    switch(lang){
      case 'ar': return ar; break;
      case 'cs': return cs; break;
      case 'de': return de; break;
      case 'en': return en; break;
      case 'es': return es; break;
      case 'fr': return fr; break;
      case 'gl': return gl; break;
      case 'it': return it; break;
      case 'nl': return nl; break;
      case 'pl': return pl; break;
      case 'pt': return pt; break;
      default: return en;
    }
}

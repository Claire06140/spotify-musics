const path = require('path')
const commonConfig = require('./webpack.config.cjs');

module.exports = {
  ...commonConfig,
  output: {
    path: path.resolve(process.cwd(), 'src/frontend/dist'),
    filename: 'bundle.[hash].js',
  },
  /* Gestion du cache : configuration du service des workers ou plugins tels que WorkboxWebpackPlugin pour la mise en cache des ressources et l'amélioration de la performance.

Configuration de variables d'environnement spécifiques à la production - optimiser certains comportements ou activer/désactiver des fonctionnalités spécifiques.

 */
}

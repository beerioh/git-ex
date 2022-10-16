'use strict'

function getProjById(projId) {
    const projIdx = gProjs.findIndex(proj => proj.id === projId)
    return gProjs[projIdx]
}
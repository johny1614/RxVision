
## TODO / Planned improvements
- Research about automatic applying of addRxVisionEmission (maybe AI is better now, before aider was the closes but no cigar).
- Stop button - to let the emissions be stopped from going to the extension
- Test on a 1000+ emissions and many streams (performance)
- Real life Use cases scenario presentation
- 

Bugs:
- Sometimes selecting range is buggy - there is 0 ms (maybe after we go back to Full range?)
- After long idle of web page and refreshing it - sometimes there are missing markers, maybe after changes of permissions in manifest
- Same thing on stackblitz ^^

UI analysis/improvements:
- Dot lines of streams - maybe on the left split pane side too? Maybe different design?
- Maybe don't let left pane to be bigger than the longest stream name?
- Selecting markers - and displaying them in a right sidebar?
- Exporting data as JSON
- Importing data from JSON
- Exporting to Image/PDF
- Approach of not rerendering all markers components but only changing their positions when possible
- Stream based on different streams (with particular rxjs pipe)
- Dark mode (toggler && auto based on system theme or maybe time of day?)
- Ability to hide stream
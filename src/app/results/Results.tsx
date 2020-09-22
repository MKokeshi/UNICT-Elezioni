import React, { useEffect, useState } from 'react';
import './Results.scss';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


interface Props {
  anno?: string;
  path?: string;
}

const Results = (props: Props) => {
  const data = require(`../../data/${props.anno}/${props.path}.json`);
  const [show, setShow] = useState(false);

  function generateTableRows(data: any): JSX.Element[] {

    // init results
    const results: { [key: string]: any[] } = {}; // any -> eletti[]

    data.liste.forEach((l: any) => results[l.nome] = []);
    data.eletti.forEach((e: any) => results[e.lista].push(Object.assign(e, { eletto: true })));
    data.non_eletti.forEach((e: any) => results[e.lista].push(Object.assign(e, { eletto: false })));

    // get max rows count
    const maxRows = Object.values(results).reduce((acc, prev) => acc < prev.length ? prev.length : acc, 0);

    // generate tableRows
    const tableRows = [];
    for (let i = 0; i < maxRows; i++) {
      tableRows.push(
        <tr key={`${props.anno}-${i}`}>
          {Object.keys(results).map(l =>
            <td key={`${props.anno}-${l}-${i}`}>
              {(results[l] && results[l][i]) ? (
                [
                  `${results[l][i].nominativo} (${results[l][i].voti})`,
                  results[l][i].eletto ? (<img key={`coccarda-${i}`} src="coccarda.png" alt="eletto" width="16" height="30" className="float-right" />) : ''
                ]
              ) : ''}
            </td>
          )}
       </tr>
      )
    }

    return tableRows;
  }


  function fix_names(name: string): string {
    return name.replace('#', '')
      .replace(/ /g, ' ')
      .replace(/ /g, ' ')
      .replace('ALLENZA UNIVERSITARIA', 'ALLEANZA UNIVERSITARIA')
      .replace('NIKE  ‐  ARCADIA', 'ARCADIA - NIKE')
      .replace('INGENERIATTIVA', 'INGEGNERIATTIVA')
      .replace('LA FINESTRA  ‐  LIBERI DI SCEGLIERE', 'LA FINESTRA ‐ LIBERI DI SCEGLIERE')
      .replace('LA FINESTRA‐LIBERI DI SCEGLIERE', 'LA FINESTRA ‐ LIBERI DI SCEGLIERE')
      .replace('LIBERTAS LIBERI E FORTI', 'LIBERTAS')
      .replace('NUOVA IBLA', 'NUOVAIBLA')
      .replace('SANI LAB', 'SANILAB')
      .replace('ECONOMIATTIVA', 'ECONOMIA ATTIVA')
      .replace('WE LOVE UNICT/CREDIAMOCI', 'WE LOVE UNICT')
      .replace('WE LOVE UNICT - ARES', 'WE LOVE UNICT')
      .replace('PARTECIPA ‐ SOS GIURISTI', 'PARTECIPA')
      .replace('ARCADIA ‐ REVOLUTION', 'ARCADIA REVOLUTION')
      .replace('UDU - UNIONE DEGLI UNIVERSITARI', 'UDU  ‐  UNIONE DEGLI UNIVERSITARI')
      .replace(new RegExp("E'", "g"), 'È')
      .replace(new RegExp("A'", "g"), 'À');
  }

  function generateNOTA(): JSX.Element {
    return (
      <thead>
        <tr>
          <th>Schede Bianche</th>
          <th>Schede Nulle</th>
          <th>Schede Contestate</th>
          <th>Votanti</th>
        </tr>
        <tr>
          <td>
            {data.schede['Schede Bianche']}
          </td>
          <td>
            {data.schede['Schede Nulle']}
          </td>
          <td>
            {data.schede['Schede Contestate']}
          </td>
          <td>
            {data.perc_votanti}
          </td>
        </tr>
      </thead>
    );
  }

  function generateHead(): JSX.Element {
    return (
      <thead className="cursorPointer">
        <tr
          className="head-row"
          onClick={toggleBody}
          aria-controls="example-collapse-text"
          aria-expanded={show}>
          {data.liste.map((l: any) =>
            <OverlayTrigger placement="top"
              overlay={tooltipExpandCollapse}>
              <th key={props.anno + '-lista-' + l.nome}>
                <div className="logo" key={props.anno + '-logo-' + l.nome}>
                  <img src={`loghi/${fix_names(l.nome)}.jpg`} width="80" height="80" alt={l.nome}></img>
                </div>
                <div className="sub-logo" key={props.anno + '-name-' + l.nome}>
                  {l.nome} ({l.voti_totali})
                </div>
              </th>
            </OverlayTrigger>)}
        </tr>
      </thead>
    );
  }

  function toggleBody(e: any) {
    e.preventDefault();
    setShow(!show);
  }

  useEffect(() => { }, [show]);

  const tooltipExpandCollapse = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to Expand/Collapse
    </Tooltip>
  );

  return (
    <div className="Results">
      <div className="container-fluid p-4">
        <Card>
          <Card.Header><b>{props.anno}</b></Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-12 lists">
                {/* <h2>Dipartimento: {data.dipartimento}</h2> */}

                <Table striped bordered hover className="liste">
                  {generateHead()}

                  <Collapse in={show}>
                  <div className="generatedRows">
                  <tbody>
                    {generateTableRows(data)}
                  </tbody></div></Collapse>         
                </Table>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-2">
                <Table striped bordered hover responsive className="liste">
                  {generateNOTA()}
                </Table>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Results;

import {Fragment , useEffect} from 'react'
import {retrieveCompanies} from "../../../../../redux/actions/companiesActions.js"

function CompanyList () {

  useEffect(() => {
    retrieveTutorials();
  }, []);

  return (
    <Fragment>

    </Fragment>
  )
}

export default CompanyList
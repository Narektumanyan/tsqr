<?php

namespace app\components;

use yii\base\Component;

/**
 * Class SimilarKeywordComponent
 */
class SimilarKeywordComponent extends Component
{
	public function init(){
		$user = new \AdWordsUser();
		$user->LogAll();
		//$user->SetClientID('1071338475289-3f74gk2u9uaprnbf7thh6tbhojakv3ra.apps.googleusercontent.com');
		//$user->SetClientSecret('GL3bj9IHX2BhGGlM_JkDs52v');
		//$user->SetUserAgent('VE');

		$targetingIdeaService = $user->GetService('TargetingIdeaService');

		$keyword = 'funny animals';
		// Create selector.
		$selector = new \TargetingIdeaSelector();
		$selector->requestType = 'IDEAS';
		$selector->ideaType = 'KEYWORD';
		$selector->requestedAttributeTypes = array('KEYWORD_TEXT', 'SEARCH_VOLUME',
		  'CATEGORY_PRODUCTS_AND_SERVICES');
		// Create language search parameter (optional).
		// The ID can be found in the documentation:
		//   https://developers.google.com/adwords/api/docs/appendix/languagecodes
		// Note: As of v201302, only a single language parameter is allowed.
		$languageParameter = new \LanguageSearchParameter();
		$english = new \Language();
		$english->id = 1000;
		$languageParameter->languages = array($english);
		// Create related to query search parameter.
		$relatedToQuerySearchParameter = new \RelatedToQuerySearchParameter();
		$relatedToQuerySearchParameter->queries = array($keyword);
		$selector->searchParameters[] = $relatedToQuerySearchParameter;
		$selector->searchParameters[] = $languageParameter;
		// Set selector paging (required by this service).
		$selector->paging = new \Paging(0, \AdWordsConstants::RECOMMENDED_PAGE_SIZE);
		do {
			// Make the get request.
			$page = $targetingIdeaService->get($selector);
			// Display results.
			if (isset($page->entries)) {
			  foreach ($page->entries as $targetingIdea) {
			    $data = MapUtils::GetMap($targetingIdea->data);
			    $keyword = $data['KEYWORD_TEXT']->value;
			    $search_volume = isset($data['SEARCH_VOLUME']->value)
			        ? $data['SEARCH_VOLUME']->value : 0;
			    $categoryIds =
			        implode(', ', $data['CATEGORY_PRODUCTS_AND_SERVICES']->value);
			    printf("Keyword idea with text '%s', category IDs (%s) and average "
			        . "monthly search volume '%s' was found.\n",
			        $keyword, $categoryIds, $search_volume);
			  }
			} else {
			  print "No keywords ideas were found.\n";
			}
			// Advance the paging index.
			$selector->paging->startIndex += \AdWordsConstants::RECOMMENDED_PAGE_SIZE;
		} while ($page->totalNumEntries > $selector->paging->startIndex);


		echo '123';exit;
	}
}
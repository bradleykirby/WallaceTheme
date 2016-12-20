<?php

/* post.html */
class __TwigTemplate_115b53b23a5cb86545ec512d1479b9f2d39a6c597ef8d46141fd8eaa2c83ea95 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div>
    <article>
\t\t";
        // line 3
        if (($this->getAttribute(($context["post"] ?? null), "imageURLHiRes", array()) != "NONE")) {
            // line 4
            echo "\t        <div class=\"header-image-wrapper\">
\t            <img src=\"";
            // line 5
            echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "imageURLHiRes", array()), "html", null, true);
            echo "\" class=\"post-image\"/>
\t                <a  class=\"site-logo-anchor\" href=\"/\"><img class=\"site-logo\" src=\"";
            // line 6
            echo twig_escape_filter($this->env, $this->getAttribute(($context["siteData"] ?? null), "iconUrl", array()), "html", null, true);
            echo "\"/></a>
\t            <h1 class=\"post-title\">";
            // line 7
            echo $this->getAttribute(($context["post"] ?? null), "title", array());
            echo "</h1>
\t        </div>
        \t<div class=\"post-content\" >";
            // line 9
            echo $this->getAttribute(($context["post"] ?? null), "content", array());
            echo "</div>

\t\t";
        }
        // line 12
        echo "\t\t";
        if (($this->getAttribute(($context["post"] ?? null), "imageURLHiRes", array()) == "NONE")) {
            // line 13
            echo "\t\t\t<a  class=\"site-logo-anchor\" href=\"/\"><img class=\"site-logo\" src=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["siteData"] ?? null), "iconUrl", array()), "html", null, true);
            echo "\"/></a>
            <h1 class=\"post-title no-image\">";
            // line 14
            echo $this->getAttribute(($context["post"] ?? null), "title", array());
            echo "</h1>
        \t<div class=\"post-content no-image\" >";
            // line 15
            echo $this->getAttribute(($context["post"] ?? null), "content", array());
            echo "</div>
\t\t";
        }
        // line 17
        echo "
    </article>

</div>";
    }

    public function getTemplateName()
    {
        return "post.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  64 => 17,  59 => 15,  55 => 14,  50 => 13,  47 => 12,  41 => 9,  36 => 7,  32 => 6,  28 => 5,  25 => 4,  23 => 3,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "post.html", "/Users/bradleykirby/Code/wallace-local/wp-content/themes/Wallace/src/wp-app/templates/post.html");
    }
}

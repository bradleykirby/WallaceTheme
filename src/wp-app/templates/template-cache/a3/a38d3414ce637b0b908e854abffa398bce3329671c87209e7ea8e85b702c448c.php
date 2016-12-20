<?php

/* home.html */
class __TwigTemplate_c22aff1f5bba29797e7c85ff6ddd9d00b483c4572928192f2a4ca7193d4ecc14 extends Twig_Template
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
        echo "<header id='home-header'> 
    <a href=\"/\"><img src=\"";
        // line 2
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["siteData"]) ? $context["siteData"] : null), "iconUrl", array()), "html", null, true);
        echo "\"/></a>
    <h1 id=\"site-title\">";
        // line 3
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["siteData"]) ? $context["siteData"] : null), "title", array()), "html", null, true);
        echo "</h1>
</header>
<div id=\"post-list\">
    ";
        // line 6
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["posts"]) ? $context["posts"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["post"]) {
            // line 7
            echo "        <wal-post-item>
            <div class=\"post-image-wrapper\">
                <img class=\"post-image\" [src]=\"";
            // line 9
            echo twig_escape_filter($this->env, $this->getAttribute($context["post"], "imgUrl", array()), "html", null, true);
            echo "\"/>
            </div>
            <a class=\"post-info\" href=\"";
            // line 11
            echo twig_escape_filter($this->env, $this->getAttribute($context["post"], "path", array()), "html", null, true);
            echo "\">
                <h2 class=\"post-title\">";
            // line 12
            echo twig_escape_filter($this->env, $this->getAttribute($context["post"], "title", array()), "html", null, true);
            echo "</h2>
                <p  class=\"excerpt\">";
            // line 13
            echo twig_escape_filter($this->env, $this->getAttribute($context["post"], "excerpt", array()), "html", null, true);
            echo "</p>
                <div class=\"category\">
                    <span>";
            // line 15
            echo twig_escape_filter($this->env, $this->getAttribute($context["post"], "categoryString", array()), "html", null, true);
            echo "</span>
                </div>
            </a>
            <p class=\"excerpt-drawer\">";
            // line 18
            echo twig_escape_filter($this->env, $this->getAttribute($context["post"], "excerpt", array()), "html", null, true);
            echo "</p>
            <hr class =\"post-divider\">
        </wal-post-item>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['post'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 22
        echo "
    <h3 id=\"post-load-status\">Loading more posts...</h3>
</div>";
    }

    public function getTemplateName()
    {
        return "home.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  74 => 22,  64 => 18,  58 => 15,  53 => 13,  49 => 12,  45 => 11,  40 => 9,  36 => 7,  32 => 6,  26 => 3,  22 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "home.html", "/Users/bradleykirby/Code/wallace-local/wp-content/themes/Wallace/src/wp-app/templates/home.html");
    }
}
